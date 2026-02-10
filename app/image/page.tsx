import DisplayUpload from "@/components/DisplayUpload";

export const dynamic = "force-dynamic";

interface ImagePageProps {}

const ImagePage: React.FC<ImagePageProps> = ({}) => {
  return (
    <div className="">
      <h1 className="text-5xl font-bold text-left my-10 flex items-center justify-center">
        Image Page
      </h1>
      <DisplayUpload />
    </div>
  );
};

export default ImagePage;
