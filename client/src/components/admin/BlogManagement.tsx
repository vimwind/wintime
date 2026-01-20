import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Edit2, Plus, Upload, Loader2 } from "lucide-react";

export default function BlogManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    readTime: "",
    featured: 0,
    published: 0,
  });

  const { data: posts, refetch } = trpc.blog.list.useQuery();
  const createMutation = trpc.blog.create.useMutation();
  const updateMutation = trpc.blog.update.useMutation();
  const deleteMutation = trpc.blog.delete.useMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      // Upload to server storage
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData({ ...formData, image: data.url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content || !formData.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("Blog post updated successfully");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Blog post created successfully");
      }

      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        image: "",
        readTime: "",
        featured: 0,
        published: 0,
      });
      setIsCreating(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Failed to save blog post");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Blog post deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete blog post");
    }
  };

  const handleEdit = (post: any) => {
    setFormData(post);
    setEditingId(post.id);
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus size={18} />
            New Post
          </Button>
        )}
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Blog post title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug *</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="blog-post-slug"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full blog post content"
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author *</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time</label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Blog Post Image</label>
                    {formData.image && (
                      <div className="mb-4">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-40 w-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Upload size={18} />
                      <span className="text-sm font-medium">
                        {isUploading ? "Uploading..." : "Upload Image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                    {isUploading && <Loader2 size={18} className="animate-spin" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured === 1}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                  />
                  <span className="text-sm font-medium">Featured Post</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published === 1}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked ? 1 : 0 })}
                  />
                  <span className="text-sm font-medium">Published</span>
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending ||
                    updateMutation.isPending ||
                    isUploading
                  }
                >
                  {editingId ? "Update Post" : "Create Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      slug: "",
                      excerpt: "",
                      content: "",
                      author: "",
                      image: "",
                      readTime: "",
                      featured: 0,
                      published: 0,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="space-y-2">
        {!posts || posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No blog posts yet. Create your first post!
            </CardContent>
          </Card>
        ) : (
          posts.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {post.published === 1 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Published
                        </span>
                      )}
                      {post.featured === 1 && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        By {post.author}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                      className="gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                      className="gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
