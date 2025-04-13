import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import usePreviewImg from "@/hooks/usePreviewImg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    profilePicture: user.profile.profilePhoto,
  });

  const { handleImageChange, imageUrl } = usePreviewImg();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = {
      fullname: formData.fullname,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      skills: formData.skills,
      profilePicture: imageUrl || formData.profilePicture,
    };

    try {
      const res = await axios.post(`${USER_API}/update-profile`, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");
        setOpen(false);
      } else {
        toast.error(res.data.message || "Error updating profile.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile info.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Fullname */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bio</Label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Skills</Label>
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. react, node"
                className="col-span-3"
              />
            </div>

            {/* Profile Picture */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Photo</Label>

              <div className="col-span-3 relative">
                {/* Clickable Avatar */}
                <div
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={imageUrl || formData.profilePicture}
                      alt="profile"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>{user.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Hidden Input */}
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
