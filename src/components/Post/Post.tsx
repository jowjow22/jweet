import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IPost {
  post: {
    user: {
      avatar: string;
      name: string;
    };
    likes: number;
    reposts: number;
    body: string;
  };
}

export const Post = ({ post }: IPost) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-x-3 items-center">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/51102351?s=400&v=4" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <CardTitle>{post.user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.body}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end gap-x-4">
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MessageCircle className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
