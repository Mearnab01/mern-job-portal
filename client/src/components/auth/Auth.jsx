import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeClosed, LoaderPinwheel } from "lucide-react";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={showPassword ? "password" : "*******"}
        name="password"
        required
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
      </button>
    </div>
  );
};

const Auth = () => {
  const [signupInput, setSignupInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleSubmit = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
  };
  return (
    <div>
      <div className="flex justify-center items-center w-full mt-20">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          {/* sign up */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Sign up here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label>Fullname</Label>
                  <Input
                    type="text"
                    name="fullname"
                    value={signupInput.fullname}
                    onChange={(e) => handleInputChange(e, "signup")}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => handleInputChange(e, "signup")}
                    placeholder="@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Phone Number</Label>
                  <Input
                    type="number"
                    name="phoneNumber"
                    value={signupInput.phoneNumber}
                    onChange={(e) => handleInputChange(e, "signup")}
                    placeholder="+91...."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Password</Label>
                  <PasswordInput
                    value={signupInput.password}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <RadioGroup className="flex items-center gap-4 my-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        className="cursor-pointer"
                        checked={signupInput.role === "student"}
                        onChange={(e) => handleInputChange(e, "signup")}
                        required
                      />
                      <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        className="cursor-pointer"
                        checked={signupInput.role === "recruiter"}
                        onChange={(e) => handleInputChange(e, "signup")}
                        required
                      />
                      <Label htmlFor="r2">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSubmit("signup")}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* login */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account securely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="text"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => handleInputChange(e, "login")}
                    placeholder="@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Password</Label>
                  <PasswordInput
                    value={loginInput.password}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <RadioGroup className="flex items-center gap-4 my-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        className="cursor-pointer"
                        checked={loginInput.role === "student"}
                        onChange={(e) => handleInputChange(e, "login")}
                        required
                      />
                      <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        className="cursor-pointer"
                        checked={loginInput.role === "recruiter"}
                        onChange={(e) => handleInputChange(e, "login")}
                        required
                      />
                      <Label htmlFor="r2">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSubmit("login")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
