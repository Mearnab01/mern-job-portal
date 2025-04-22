import { useEffect, useRef, useState } from "react";
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
import { Check, Loader2, Upload } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import usePreviewImg from "@/hooks/usePreviewImg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const resumeRef = useRef(null);
  const { handleImageChange, imageUrl } = usePreviewImg();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeSelected, setResumeSelected] = useState(false);
  const [resumeFileName, setResumeFileName] = useState(
    user?.profile?.resumeOriginalName || ""
  );
  useEffect(() => {
    setResumeSelected(false); // reset on load
    setResumeFileName(user?.profile?.resumeOriginalName || "");
  }, [user]);

  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profilePicture: imageUrl || user?.profile.profilePicture,
    resumeFile: user?.profile.resume || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type.startsWith("application/msword"))
    ) {
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
      }));
      setResumeSelected(true); // show green check
      setResumeFileName(file.name);
    } else {
      toast.error("Invalid resume file. Please upload a PDF");
      setFormData((prev) => ({
        ...prev,
        resumeFile: null,
      }));
      setResumeSelected(false);
      setResumeFileName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = new FormData();
    updatedData.append("fullname", formData.fullname);
    updatedData.append("phoneNumber", formData.phoneNumber);
    updatedData.append("bio", formData.bio);
    updatedData.append("skills", formData.skills);

    // Append profile picture if changed
    if (fileRef.current && fileRef.current.files[0]) {
      updatedData.append("profilePicture", fileRef.current.files[0]);
    }

    // Append resume file if selected
    if (formData.resumeFile) {
      updatedData.append("resume", formData.resumeFile);
    }

    try {
      const res = await axios.post(`/api/user/update-profile`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
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
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={imageUrl || formData.profilePicture}
                      alt="profile"
                      className="object-contain w-full h-full"
                    />
                    <AvatarFallback>{user.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            {/* Resume */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Resume</Label>

              <div className="col-span-3 flex items-center justify-between">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => resumeRef.current.click()}
                >
                  {resumeSelected ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}

                  {resumeFileName ? (
                    <p className="italic text-sm text-blue-500 hover:underline">
                      {resumeSelected
                        ? `selected: ${resumeFileName}`
                        : `current: ${resumeFileName}`}
                    </p>
                  ) : (
                    <p className="italic text-sm text-gray-400">
                      No resume uploaded
                    </p>
                  )}
                </div>
              </div>

              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                ref={resumeRef}
                className="hidden"
              />
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
