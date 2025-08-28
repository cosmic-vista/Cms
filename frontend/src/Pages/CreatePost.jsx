import React, { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
// import QuillEditor from "../components/QuillEditor";
import JoditEditor from "jodit-react";
import axios from "axios";
import { uploadFile, getFilePreview } from "../lib/appwrite/uploadImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import joditConfig from "@/assets/joditConfiguration";
const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setfile] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    category: "",
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const editor = useRef(null);

  const imgUpload = async () => {
    try {
      if (file) {
        setLoading(true);
        const uploaded = await uploadFile(file);
        const preview = getFilePreview(uploaded.$id);
        setUrl(preview);
        setFormdata((prev) => ({
          ...prev,
          image: preview.href,
        }));
        setLoading(false);
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      setLoading(false);
    }
  };

  const handelform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/create`,
        {
          ...formdata,
          userId: currentUser?.user?.id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created:", response.data);
      navigate("/view-post");
    } catch (error) {
      console.error("Post creation failed:", error?.response?.data || error);
    }
  };

  return (
    <div className="mx-auto bg-amber-50 shadow-blue-300 p-6 md:p-10 shadow-2xl max-w-3xl rounded-3xl mt-10 md:mt-20 mb-20 h-auto">
      <h1 className="text-center font-bold text-blue-500 text-3xl md:text-4xl p-6">
        Create Post
      </h1>
      <form onSubmit={handelform} className="flex flex-col gap-6 mb-20">
        <div className="flex flex-col md:flex-row gap-6 text-xl md:text-2xl">
          <Input
            type="text"
            placeholder="Title"
            required
            value={formdata.title}
            className="w-full md:w-3/4"
            onChange={(e) =>
              setFormdata({ ...formdata, title: e.target.value })
            }
          />
          <Select
            value={formdata.category}
            onValueChange={(value) =>
              setFormdata((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="world news">World News</SelectItem>
                <SelectItem value="local news">Local News</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row gap-6 text-xl md:text-2xl">
          <Input
            type="file"
            accept="image/*,video/*"
            className="w-full md:w-3/4"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <Button
            type="button"
            className="w-full md:w-1/4"
            onClick={imgUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {url &&
          (url.mimeType.startsWith("video/") ? (
            <video
              src={url.href}
              controls
              className="w-full h-auto object-cover m-6 rounded-lg"
            />
          ) : (
            <img
              src={url.href}
              alt="Preview"
              className="w-auto h-auto object-cover m-6 rounded-lg"
            />
          ))}

        {/* OLD: <QuillEditor onChange={(val) => setFormdata({ ...formdata, description: val })} /> */}

        <div className="flex flex-col h-auto text-xl md:text-2xl">
          <JoditEditor
            ref={editor}
            value={formdata.description}
            config={joditConfig}
            onBlur={(newContent) =>
              setFormdata((prev) => ({ ...prev, description: newContent }))
            }
          />
        </div>

        <Button type="submit" className="w-full md:w-auto mt-4">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
