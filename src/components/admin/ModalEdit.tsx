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
import { propertiesToRent } from "@/data/propertiesToRent";
import { propertiesToSale } from "@/data/propertiesToSale";

type Property = {
  propertyId?: string;
  city: string;
  state: string;
  title: string;
  description: string;
  category: string;
  guests: number;
  beds: number;
  neighborhood?: string;
  bedroom: number;
  bathroom: number;
  coverImage?: string;
  isFeatured?: boolean;
};

type ModalProps = {
  onClose?: () => void;
  propertyId: string;
};

const ModalEdit = ({ onClose, propertyId }: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [propertySelected, setPropertySelected] = useState<Property>({
    propertyId: "",
    city: "",
    state: "",
    title: "",
    description: "",
    category: "",
    guests: 1,
    beds: 1,
    bedroom: 1,
    bathroom: 1,
    coverImage: "",
    isFeatured: false,
  });

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      isFeatured: false,
      state: "",
      city: "",
      neighborhood: "",
      bedroom: 1,
      beds: 1,
      guests: 1,
      bathroom: 1,
    },
  });

  //Fazer o get para pegar os valores de cada campo
  useEffect(() => {
    const getProperty = propertiesToRent.some(
      (property) => property.id === propertyId,
    )
      ? propertiesToRent.find((property) => property.id === propertyId)
      : propertiesToSale.find((property) => property.id === propertyId);

    if (getProperty) {
      const formatProperty: Property = {
        propertyId: getProperty.id,
        city: getProperty.city,
        state: getProperty.state,
        title: getProperty.title,
        description: getProperty.description,
        category: getProperty.category,
        guests: getProperty.guests,
        beds: getProperty.beds,
        bedroom: getProperty.bedroom,
        bathroom: getProperty.bathroom,
        coverImage:
          getProperty.images.find((item) => item.cover_image)?.image_url || "",
        isFeatured: getProperty.is_featured,
      };

      console.log("teste", formatProperty);

      setPropertySelected(formatProperty);

      form.reset({
        title: formatProperty.title,
        description: formatProperty.description,
        category: formatProperty.category,
        isFeatured: formatProperty.isFeatured,
        state: formatProperty.state,
        city: formatProperty.city,
        neighborhood: formatProperty.neighborhood,
        bedroom: formatProperty.bedroom,
        beds: formatProperty.beds,
        guests: formatProperty.guests,
        bathroom: formatProperty.bathroom,
      });
    }
    console.log("teste");
  }, []);

  async function onSubmit(data: Property) {
    try {
      setIsLoading(true);

      console.log("data", data);

      toast.success("Cadastro realizado com sucesso!");
      onClose?.();
    } catch (error) {
      toast.error("Erro ao realizar cadastrar imóvel.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full h-full z-50 ">
      <div className="bg-black/40 backdrop-blur-xl w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col bg-white w-[calc(100%-32px)] max-w-200 h-[calc(100%-32px)] rounded-sm px-8 max-lg:px-4 py-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <IoClose />
        </button>

        <h1 className="text-center font-semibold font-cormorant text-xl">
          Editar imóvel
        </h1>
        <div>
          <span className="font-semibold text-xs">Fotos</span>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full overflow-y-scroll h-10/12 mb-4"
        >
          <FieldGroup>
            <div className="flex max-lg:flex-col gap-8 max-lg:gap-4 h-screen">
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
                  name="isFeatured"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="fieldgroup-isFeatured"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border border-gray-400"
                        />

                        <FieldLabel
                          htmlFor="fieldgroup-isFeatured"
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
                  name="bedroom"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-bedroom"
                        className="font-semibold text-xs"
                      >
                        Quartos
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-bedroom" className="w-full">
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
                  name="bathroom"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="field-bathroom"
                        className="font-semibold text-xs"
                      >
                        Banheiros
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="field-bathroom" className="w-full">
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
