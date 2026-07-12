import { IoClose } from "react-icons/io5";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@base-ui/react/input";
import DefaultButton from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schemas/property";
import * as z from "zod";
import { useState } from "react";
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
import { supabase } from "../../lib/supabase";
import useCreateProperty from "@/hooks/useCreateProperty";
import type { Property, PropertyImages } from "@/types/properties";

type ModalProps = {
  onClose?: () => void;
  purpose: string;
};

const ModalAdd = ({ onClose, purpose }: ModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { createProperty, property, error, loading } = useCreateProperty();

  const [previews, setPreviews] = useState<string[]>([]);

  // Exemplo:
  const propertyId = "87653318-1c22-412b-93e0-097671f7857b";
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
    },
  });

  console.log("defaultValues: ", form.getValues())

  async function onSubmit(data: Property) {
    try {
      createProperty(data);

      console.log("data", data);
      saleImages();

      toast.success("Cadastro realizado com sucesso!");
      onClose?.();
    } catch (error) {
      toast.error("Erro ao realizar cadastrar imóvel.");
    } finally {
    }
  }

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 15) {
      toast.error("Máximo de 15 imagens");
      return;
    }

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews(previewUrls);
  };

  const saleImages = async () => {
    try {
      const imagesToInsert: PropertyImages[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const extension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${i}.${extension}`;

        const filePath = `${propertyId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property_images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("property_images").getPublicUrl(filePath);

        imagesToInsert.push({
          property_id: propertyId,
          image_url: publicUrl,
          position: i,
          cover_image: i == 0 ? true : false,
        });
      }

      const { error } = await supabase
        .from("property_images")
        .insert(imagesToInsert);

      if (error) {
        throw error;
      }

      toast.success("Imagens enviadas com sucesso!");
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar imagens");
    } finally {
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col bg-white w-[calc(100%-32px)] max-w-200 h-[calc(100%-32px)] rounded-sm px-8 max-lg:px-4 py-4">
        <h1 className="font-semibold pb-4">Cadastrar anúncio para {purpose=="rent" ? "alugar" : "vender"}</h1>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose />
        </button>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full overflow-y-scroll h-9/12"
        >
          <div className="flex flex-col gap-2 rounded-xl p-4 m-2 border border-gray-300">
            <h1 className="text-sm font-semibold">Fotos</h1>
            <h2 className="text-xs opacity-70">
              Selecione as imagens na ordem que deseja que apareça no anúncio.
              Primeira imagem, será a capa principal!
            </h2>
            <h3 className="text-[10px] font-medium">Máximo de 15 imagens</h3>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleSelectImages}
              className="bg-primary5/15 p-4 text-xs cursor-pointer rounded"
            />

            <div className="grid grid-cols-8 max-lg:grid-cols-6 max-md:grid-cols-4 gap-2">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs">{files.length} imagens selecionadas</p>
          </div>

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
                          <SelectItem value="Apartmento">
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
              </div>
              <div className="flex-1 flex flex-col gap-4">
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
            text="CRIAR"
            style="absolute bottom-2 right-4 w-24"
            typeSubmit={true}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalAdd;
