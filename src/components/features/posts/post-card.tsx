import { Post } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onViewDetails?: (post: Post) => void;
}

export function PostCard({ post, onViewDetails }: PostCardProps) {
  const truncatedBody = post.body.length > 150 
    ? `${post.body.substring(0, 150)}...` 
    : post.body;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        <p className="text-sm text-gray-500">Post ID: {post.id} | User ID: {post.userId}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{truncatedBody}</p>
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(post)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
