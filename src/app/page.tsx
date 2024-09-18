import { PostForm } from "@/components/PostForm/PostForm";
import { Post } from "@/components/Post/Post";

export default async function Home() {
  return (
    <div className="flex flex-col items-center w-full py-10 px-44 gap-y-10">
      <PostForm />
      <Post
        post={{
          user: {
            name: "Jonata",
            avatar:
              "https://avatars.githubusercontent.com/u/51102351?s=400&v=4",
          },
          likes: 0,
          reposts: 0,
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        }}
      />
    </div>
  );
}
