import "./App.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "@tanstack/react-form";
import "react-toastify/dist/ReactToastify.css";

type AlbumResType = {
  title: string;
  price: string;
  artist: string;
}[];

function App() {
  const [getResponse, setGetResponse] =
    useState<AxiosResponse<AlbumResType, unknown>>();

  const fetcher = () =>
    axios
      .get("http://172.16.10.88:8080/albums/", { withCredentials: false })
      .then((res) => {
        setGetResponse(res);
        toast("🦄 FETCHED !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.error(err));

  const poster = ({
    title,
    artist,
    price,
  }: {
    title: string;
    artist: string;
    price: string;
  }) => {
    axios
      .post("http://172.16.10.88:8080/albums/", { title, artist, price })
      .then(() => {
        fetcher();
        toast("🦄 Created !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("err :", err);

        toast(`NooO :(, ${err?.response?.data}`, { type: "error" });
      });
  };

  const form = useForm({
    defaultValues: {
      title: "",
      artist: "",
      price: "",
    },
    onSubmit: async ({ value }) => poster({ ...value }),
  });

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div>
      <h1>Vite + React FE 1</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <form.Field
              name="title"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Title: </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="artist"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Artist: </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="price"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Price: </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>
          <button type="submit" onClick={() => fetcher()}>
            Post to DB
          </button>
        </div>
      </form>
      <div className="">
        <h3>DB Values</h3>
        <hr />
        <p>
          {getResponse?.data?.map((album, i) => (
            <span>
              {i !== 0 && " -"} {album?.title}
            </span>
          ))}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
