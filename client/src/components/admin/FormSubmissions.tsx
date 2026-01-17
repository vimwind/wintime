import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Clock } from "lucide-react";

export default function FormSubmissions() {
  const { data: submissions, refetch } = trpc.forms.list.useQuery();
  const updateStatusMutation = trpc.forms.updateStatus.useMutation();

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: newStatus as any,
      });
      toast.success("Status updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const statuses = ["new", "contacted", "confirmed", "completed", "cancelled"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Form Submissions</h2>
        <p className="text-muted-foreground">Track and manage booking requests and inquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statuses.map((status) => (
          <Card key={status}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm capitalize">{status}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions?.filter((s: any) => s.status === status).length || 0}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {submissions?.map((submission: any) => (
          <Card key={submission.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{submission.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail size={16} />
                        {submission.email}
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={16} />
                          {submission.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={statusColors[submission.status]}>
                    {submission.status}
                  </Badge>
                </div>

                {(submission.service || submission.preferredDate || submission.preferredTime) && (
                  <div className="bg-secondary p-3 rounded-lg text-sm space-y-1">
                    {submission.service && <div><strong>Service:</strong> {submission.service}</div>}
                    {submission.preferredDate && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {submission.preferredDate}
                      </div>
                    )}
                    {submission.preferredTime && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {submission.preferredTime}
                      </div>
                    )}
                  </div>
                )}

                {submission.notes && (
                  <div className="bg-secondary p-3 rounded-lg text-sm">
                    <strong>Notes:</strong> {submission.notes}
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {statuses
                    .filter((s) => s !== submission.status)
                    .map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(submission.id, status)}
                        disabled={updateStatusMutation.isPending}
                        className="capitalize"
                      >
                        Mark as {status}
                      </Button>
                    ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  Submitted: {new Date(submission.createdAt).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!submissions || submissions.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No form submissions yet
          </CardContent>
        </Card>
      )}
    </div>
  );
}
