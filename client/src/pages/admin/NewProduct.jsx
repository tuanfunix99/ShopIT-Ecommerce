import React, { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import FormInput from "../../components/ui/input/FormInput";
import Button from "../../components/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions/index";
import Toast from "../../utils/Toast";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isCompleted } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      allActions.productActs.createProduct({
        name,
        category,
        description,
        price,
        seller,
        stock,
        images,
      })
    );
  };

  const onUploadFileImage = (e) => {
    const files = Array.from(e.target.files);
    const types = ["image/jpeg", "image/jpg", "image/png"];
    files.forEach((file) => {
      if (!types.includes(file.type)) {
        alert("File not image");
        return;
      }
    });
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  if (isCompleted) {
    setCategory("");
    setImages([]);
    setImagesPreview([]);
    setName("");
    setDescription("");
    setSeller("");
    setPrice(0);
    setStock(0);
    dispatch(allActions.productActs.clear());
    Toast.success("Upload new product success");
  }

  return (
    <AdminLayout>
      <div className="col-lg-6 col-md-8 mx-auto my-3">
        <form
          className="shadow-lg p-5"
          encType="multipart/form-data"
          onSubmit={onSubmitHandler}
        >
          <h1 className="mb-3">Create new product</h1>
          <FormInput
            label="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            disabled={loading}
          />
          <FormInput
            label="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required={true}
            disabled={loading}
          />
          <FormInput
            label="stock"
            type="number"
            value={stock}
            min={0}
            max={1000}
            onChange={(e) => setStock(e.target.value)}
            required={true}
            disabled={loading}
          />
          <FormInput
            label="description"
            textarea={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
            disabled={loading}
          />
          <FormInput
            label="Category"
            select={true}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </FormInput>
          <FormInput
            label="seller"
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            required={true}
            disabled={loading}
          />
          <div className="form-group">
            <label>Images</label>
            <div className="custom-file">
              <input
                type="file"
                name="product_images"
                className="custom-file-input"
                id="customFile"
                onChange={onUploadFileImage}
                multiple
                disabled={loading}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Images
              </label>
            </div>
            {imagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                className="mt-3 mr-2"
                width="55"
                height="52"
              />
            ))}
          </div>
          <Button
            type="submit"
            className="admin btn btn-block py-3 mb-2"
            disabled={loading}
          >
            {!loading && "SAVE"}
            {loading && (
              <div>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                SAVING...
              </div>
            )}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
