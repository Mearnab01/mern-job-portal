import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const PreviewImage = ({ image, fallback, onChange }) => {
  const preview = image ? URL.createObjectURL(image) : fallback;
  return (
    <div className="relative w-20 h-20">
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full rounded-full object-cover border"
      />
      <Label
        htmlFor="profile-upload"
        className="absolute bottom-0 right-0 bg-white border p-1 rounded-full cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </Label>
      <Input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
};

export default PreviewImage;
