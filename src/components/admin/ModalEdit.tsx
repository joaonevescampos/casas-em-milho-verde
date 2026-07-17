import { IoClose } from "react-icons/io5";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@base-ui/react/input";
import DefaultButton from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schemas/property";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import type { Property, PropertyImages } from "@/types/properties";
import Loading from "../Loading";
import useAddImages from "@/hooks/useAddImages";
import useDetailProperty from "@/hooks/useDetailProperty";
import useGetAllImages from "@/hooks/useGetAllImages";
import useDeleteImages from "@/hooks/useDeleteImage";
import useUpdateProperty from "@/hooks/useUpdateProperty";

type ModalProps = {
  onClose?: () => void;
  purpose: string;
  propertyId: string;
};

const ModalEdit = ({ onClose, purpose, propertyId }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagesFromStorage, setImagesFromStorage] =
    useState<PropertyImages[]>();
  const [previews, setPreviews] = useState<string[]>([]);

  const { property } = useDetailProperty(propertyId);
  const { images } = useGetAllImages();
  const { updateProperty, loading: loadingUpdate } = useUpdateProperty();
  const { addImages, loading: loadingImages } = useAddImages();
  const { deleteImage } = useDeleteImages();
  const [fakeLoading, setFakeLoading] = useState(false)

  const findImages = (propertyId: string) => {
    const selectedImages = images?.filter(
      (image) => image.property_id === propertyId,
    );

    setImagesFromStorage(selectedImages);
  };

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      purpose,
      title: "",
      description: "",
      category: "",
      is_featured: false,
      state: "",
      city: "",
      neighborhood: "",
      bedrooms: 1,
      beds: 1,
      guests: 1,
      bathrooms: 1,
      airbnb_link: "",
    },
  });

  useEffect(() => {
    findImages(propertyId);
  }, [images, form]);

  useEffect(() => {
    console.log("entrei no useEffect");
    if (!property) return;

    form.reset({
      purpose: property.purpose,
      title: property.title,
      description: property.description,
      category: property.category,
      is_featured: property.is_featured,
      state: property.state,
      city: property.city,
      neighborhood: property.neighborhood,
      bedrooms: property.bedrooms,
      beds: property.beds,
      guests: property.guests,
      bathrooms: property.bathrooms,
      airbnb_link: property.airbnb_link,
    });
  }, [property, form]);

  async function onSubmit(data: Property) {
    try {
      setFakeLoading(true)
      await updateProperty(propertyId, data);
      await addImages(files, propertyId, imagesFromStorage?.length || 0);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Erro ao realizar a edição do imóvel.");
    }
  }

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const totalImages =
      (imagesFromStorage?.length ?? 0) + files.length + selectedFiles.length;

    if (totalImages > 15) {
      toast.error("Máximo de 15 imagens.");
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removePreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));

    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteStorageImage = async (imageId: string) => {
    try {
      await deleteImage(imageId);

      setImagesFromStorage((prev) =>
        prev?.filter((image) => image.id !== imageId),
      );
    } catch {
      toast.error("Erro ao remover imagem.");
    }
  };

  if (loadingUpdate || loadingImages || fakeLoading) {
    return <Loading />;
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col bg-white w-[calc(100%-32px)] max-w-200 h-[calc(100%-32px)] max-h-180 rounded-sm px-8 max-lg:px-4 py-4">
        <h1 className="font-semibold pb-4">
          Edição de anúncio para {purpose == "rent" ? "alugar" : "vender"}
        </h1>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose />
        </button>

        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
          className="w-full overflow-y-scroll  h-10/12"
        >
          <div className="grid grid-cols-8 max-lg:grid-cols-6 max-md:grid-cols-4 gap-3">
            {/* Imagens do Storage */}

            {imagesFromStorage?.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg border"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteStorageImage(image.id!)}
                  className="absolute top-1 right-1 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center shadow cursor-pointer"
                >
                  ✕
                </button>

                {image.cover_image && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary1  w-full text-[10px] text-white text-center font-bold">
                    CAPA
                  </span>
                )}

                <img
                  src={image.image_url}
                  alt="image"
                  className={`${image.cover_image ? "border-2 border-primary1 rounded-lg" : ""} w-full h-full object-cover`}
                />
              </div>
            ))}

            {/* Novas imagens */}

            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg border"
              >
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-1 right-1 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center shadow cursor-pointer"
                >
                  ✕
                </button>

                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Botão adicionar */}

            {(imagesFromStorage?.length ?? 0) + files.length < 15 && (
              <label
                htmlFor="images"
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
              >
                <span className="text-3xl">+</span>
                <span className="text-xs">Adicionar</span>
              </label>
            )}
          </div>

          <p className="text-xs mt-2">
            {(imagesFromStorage?.length ?? 0) + files.length} / 15 imagens
          </p>

          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleSelectImages}
            className="hidden"
          />

          <FieldGroup>
            <div className="flex max-lg:flex-col gap-8 max-lg:gap-4 h-fit m-2">
              <div className="flex-2 flex flex-col gap-4">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldgroup-title"
                        className="font-semibold text-xs"
                      >
                        Título
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fieldgroup-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o título"
                        autoComplete="off"
                        className="h-10 px-2 text-xs border border-gray-300 rounded"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldgroup-description"
                        className="font-semibold text-xs"
                      >
                        Descrição
                      </FieldLabel>
                      <Textarea
                        {...field}
                        rows={20}
                        cols={10}
                        id="fieldgroup-description"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite uma descrição"
                        autoComplete="off"
                        className="h-50 px-2 text-xs! border border-gray-300 rounded"
                      />

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="is_featured"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="fieldgroup-is_featured"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border border-gray-400"
                        />

                        <FieldLabel
                          htmlFor="fieldgroup-is_featured"
                          className="font-semibold text-xs"
                        >
                          Marcar como anúncio em destaque
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-category"
                        className="font-semibold text-xs"
                      >
                        Categoria
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-category" className="w-full">
                          <SelectValue
                            placeholder="Selecione uma categoria"
                            className="text-xs"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Casa">Casa</SelectItem>
                          <SelectItem value="Apartamento">
                            Apartamento
                          </SelectItem>
                          <SelectItem value="Terreno">Terreno</SelectItem>
                          <SelectItem value="Comercial">Comercial</SelectItem>
                          <SelectItem value="Kitnet">Kitnet</SelectItem>
                          <SelectItem value="Flat">Flat</SelectItem>
                          <SelectItem value="Sobrado">Sobrado</SelectItem>
                          <SelectItem value="Mansão">Mansão</SelectItem>
                          <SelectItem value="Fazenda">Fazenda</SelectItem>
                          <SelectItem value="Sitio">Sítio</SelectItem>
                           <SelectItem value="Chale">Chalé</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="airbnb_link"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldgroup-airbnb_link"
                        className="font-semibold text-xs"
                      >
                        Link do anúncio do Airbnb
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fieldgroup-airbnb_link"
                        aria-invalid={fieldState.invalid}
                        placeholder="Adicione o link do airbnb do seu anúncio"
                        type="text"
                        autoComplete="off"
                        className="h-10 px-2 text-xs border border-gray-300 rounded"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-state"
                        className="font-semibold text-xs"
                      >
                        Estado
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-state" className="w-full">
                          <SelectValue
                            placeholder="Selecione um estado"
                            className="text-xs"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="RN">
                            Rio Grande do Norte
                          </SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldgroup-city"
                        className="font-semibold text-xs"
                      >
                        Cidade
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fieldgroup-city"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o nome da cidade"
                        type="text"
                        autoComplete="off"
                        className="h-10 px-2 text-xs border border-gray-300 rounded"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="neighborhood"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldgroup-neighborhood"
                        className="font-semibold text-xs"
                      >
                        Bairro (opcional)
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fieldgroup-neighborhood"
                        aria-invalid={fieldState.invalid}
                        placeholder="Digite o nome do bairro"
                        type="text"
                        autoComplete="off"
                        className="h-10 px-2 text-xs border border-gray-300 rounded"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="bedrooms"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-bedrooms"
                        className="font-semibold text-xs"
                      >
                        Quartos
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-bedrooms" className="w-full">
                          <SelectValue placeholder="Selecione a quantidade de quartos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1}>1</SelectItem>
                          <SelectItem value={2}>2</SelectItem>
                          <SelectItem value={3}>3</SelectItem>
                          <SelectItem value={4}>4</SelectItem>
                          <SelectItem value={5}>5</SelectItem>
                          <SelectItem value={6}>6</SelectItem>
                          <SelectItem value={7}>7</SelectItem>
                          <SelectItem value={8}>8</SelectItem>
                          <SelectItem value={9}>9</SelectItem>
                          <SelectItem value={10}>10</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="beds"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-beds"
                        className="font-semibold text-xs"
                      >
                        Camas
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-beds" className="w-full">
                          <SelectValue placeholder="Selecione a quantidade de camas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1}>1</SelectItem>
                          <SelectItem value={2}>2</SelectItem>
                          <SelectItem value={3}>3</SelectItem>
                          <SelectItem value={4}>4</SelectItem>
                          <SelectItem value={5}>5</SelectItem>
                          <SelectItem value={6}>6</SelectItem>
                          <SelectItem value={7}>7</SelectItem>
                          <SelectItem value={8}>8</SelectItem>
                          <SelectItem value={9}>9</SelectItem>
                          <SelectItem value={10}>10</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="bathrooms"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-bathrooms"
                        className="font-semibold text-xs"
                      >
                        Banheiros
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-bathrooms" className="w-full">
                          <SelectValue placeholder="Selecione a quantidade de banheiros" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1}>1</SelectItem>
                          <SelectItem value={2}>2</SelectItem>
                          <SelectItem value={3}>3</SelectItem>
                          <SelectItem value={4}>4</SelectItem>
                          <SelectItem value={5}>5</SelectItem>
                          <SelectItem value={6}>6</SelectItem>
                          <SelectItem value={7}>7</SelectItem>
                          <SelectItem value={8}>8</SelectItem>
                          <SelectItem value={9}>9</SelectItem>
                          <SelectItem value={10}>10</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="guests"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-guests"
                        className="font-semibold text-xs"
                      >
                        Hóspedes
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-guests" className="w-full">
                          <SelectValue placeholder="Selecione a quantidade de hospedes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={1}>1</SelectItem>
                          <SelectItem value={2}>2</SelectItem>
                          <SelectItem value={3}>3</SelectItem>
                          <SelectItem value={4}>4</SelectItem>
                          <SelectItem value={5}>5</SelectItem>
                          <SelectItem value={6}>6</SelectItem>
                          <SelectItem value={7}>7</SelectItem>
                          <SelectItem value={8}>8</SelectItem>
                          <SelectItem value={9}>9</SelectItem>
                          <SelectItem value={10}>10</SelectItem>
                          <SelectItem value={11}>11</SelectItem>
                          <SelectItem value={12}>12</SelectItem>
                          <SelectItem value={13}>13</SelectItem>
                          <SelectItem value={14}>14</SelectItem>
                          <SelectItem value={15}>15</SelectItem>
                          <SelectItem value={16}>16</SelectItem>
                          <SelectItem value={17}>17</SelectItem>
                          <SelectItem value={18}>18</SelectItem>
                          <SelectItem value={19}>19</SelectItem>
                          <SelectItem value={20}>20</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </FieldGroup>
          <DefaultButton
            text="SALVAR"
            style="absolute bottom-2 right-4 w-24"
            typeSubmit={true}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
