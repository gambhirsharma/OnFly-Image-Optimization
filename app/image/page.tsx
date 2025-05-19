import DisplayUpload from "@/components/DisplayUpload";

interface ImagePageProps {
  
}

const ImagePage: React.FC<ImagePageProps> = ({  }) => {
  return (
    <div className="">
      <h1 className="text-5xl font-bold text-left mb-10">
        Image Page
      </h1>
      <DisplayUpload/>
    </div>
  );
};

export default ImagePage;
