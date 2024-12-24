"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function CakeForm() {
  const [product, setProduct] = useState({
    description: "",
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({ name: "", image: "", description: "" }); // Estado para mensajes de error
  const form = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const params = useParams();

  // Manejo del cambio en los campos de texto
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores de descripción cuando el usuario empiece a escribir
    if (e.target.name === "description") {
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
  };

  // Validación de la imagen (solo aceptar imágenes .jpg, .jpeg, .png)
  const validateImage = () => {
    if (!file) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "Debes seleccionar una imagen." }));
      return false;
    }
    const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (!validExtensions.includes(file.type)) {
      setErrors((prevErrors) => ({ ...prevErrors, image: "El archivo debe ser una imagen (JPG, JPEG, PNG)." }));
      return false;
    }
    return true;
  };

  // Manejo de la selección del archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrors((prevErrors) => ({ ...prevErrors, image: "" })); // Limpiar error de imagen
    }
  };

  // Manejo del clic en el botón para seleccionar archivo
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el campo de descripción
    if (!product.description.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "La descripción es requerida.",
      }));
      return; // Detener el envío si no es válido
    }

    // Validar la imagen
    const isImageValid = validateImage();
    if (!isImageValid) return; // No enviar el formulario si hay errores

    const formData = new FormData();
    formData.append("description", product.description);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (!params.id) {
        await axios.post("/api/cakes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`/api/products/${params.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      form.current.reset();
      router.refresh();
      router.push("/gallery");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex w-full p-2 h-auto md:w-[600px]">
      <form
        className="bg-pink-50 bg-opacity-40 shadow-md rounded-md p-2 border-2 flex flex-col items-center gap-2 border-pink-100 w-full h-full"
        onSubmit={handleSubmit}
        ref={form}
      >
        {/* Descripción del producto */}
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
          Product Description
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Descripción"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

        {/* Botón para seleccionar archivo */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-amber-800 bg-opacity-60 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg mt-3 w-64"
        >
          Cargar Imagen
        </button>

        {/* Mostrar nombre del archivo seleccionado */}
        {fileName && (
          <p className="text-gray-700 mt-2">
            Archivo seleccionado: <strong>{fileName}</strong>
          </p>
        )}

        {/* Input de archivo oculto */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Mostrar vista previa de la imagen seleccionada */}
        {file && (
          <img
            className="w-96 object-contain mx-auto my-4 shadow-md rounded-lg"
            src={URL.createObjectURL(file)}
            alt="Vista previa"
          />
        )}

        {/* Mensaje de error para la imagen */}
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

        {/* Botón de enviar */}
        <button className="bg-amber-800 bg-opacity-60 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded w-full">
          {params.id ? "Actualizar Producto" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}

export default CakeForm;
