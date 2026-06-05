import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import useGetAllProperties from "../../hooks/useGetAllProperties";
import useDetailProperty from "../../hooks/useDetailProperty";
import useCreateProperty from "../../hooks/useCreateProperty";
import type { Property } from "../../types/properties";
import useUpdateProperty from "../../hooks/useUpdateProperty";
import useDeleteProperty from "../../hooks/useDeleteProperty";

const data : Property = {
            title: "Casa Teste atuaizada",
            price: 350000,
            purpose: "rent",
            category: "apartamento",
            slug: "teste-teste4",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint aliquam numquam dolore quaerat illo iusto, distinctio, sit officia, ut dicta eum labore amet error vero explicabo earum assumenda quas delectus!",
            state: "Paraíba",
            city: "Cabedelo",
            neighborhood: "Mangabeira",
            bedrooms: 3,
            bathrooms: 1,
            balcony: null,
            garage: null,
            guests: 3,
            beds: 2,
            area: 104,
            rate: 4.86,
            airbnb_link: "https://www.airbnb.com.br/rooms/1345473862660743223?source_impression_id=p3_1779761873_P3m4EPHKPQcsa32l",
    
            is_featured: true,
            status: "available",

          }

function Test() {
  // const {properties, loading, error} = useGetAllProperties()

  // const {property, loading : loadingDetail, error : errorDetail} = useDetailProperty("87653318-1c22-412b-93e0-097671f7857b")

  // criar uma propriedade
  const {property, createProperty, loading, error} = useCreateProperty()

  // Editar propriedade
  // const {updateProperty, loading, error} = useUpdateProperty()

  // Deletar propriedade
  // const {deleteProperty, loading, error} = useDeleteProperty()

  // Listar todos
  // console.log("properties", properties, "loading", loading, "error", error)

  // Listar um

  // console.log("property", property, "loading", loadingDetail, "error", errorDetail)

  useEffect(() => {
    createProperty(data)
    console.log("property inserido", property, "loading", loading, "error", error)
    // updateProperty("cb56e7ea-241b-442c-86cc-68cc24488062", data)
    // console.log("property atualizada", "loading", loading, "error", error)
    // deleteProperty("cb56e7ea-241b-442c-86cc-68cc24488062")
    // console.log("property deletada", "loading", loading, "error", error)
  }, []);

  useEffect(() => {
    // const insertData = async () => {
    //   const { data, error } = await supabase
    //     .from("properties")
    //     .insert([
    //       {
    //         title: "Casa Teste",
    //         price: 350000,
    //         purpose: "rent",
    //         category: "casa",
    //         slug: "teste-teste",
    //         description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint aliquam numquam dolore quaerat illo iusto, distinctio, sit officia, ut dicta eum labore amet error vero explicabo earum assumenda quas delectus!",
    //         state: "Paraíba",
    //         city: "Cabedelo",
    //         neighborhood: "José Américo",
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         balcony: 0,
    //         guests: 3,
    //         beds: 2,
    //         area: 64,
    //         rate: 4.86,
    //         airbnb_link: "https://www.airbnb.com.br/rooms/1345473862660743223?source_impression_id=p3_1779761873_P3m4EPHKPQcsa32l",
    //         cover: "https://a0.muscache.com/im/pictures/hosting/Hosting-1345473862660743223/original/87610c81-b34b-44ef-b4b1-a5cd64709d7d.jpeg?im_w=960",
    //         is_featured: true,
    //         status: "available",
    //       },
    //     ])
    //     .select();
    //   console.log("data", data, "error", error);
    // };
    // async function loadProperties() {
    //   const { data, error } = await supabase.from("properties").select("*");
    //   console.log("Dados:", data);
    //   if (error) {
    //     console.error(error);
    //   }
    // }
    // loadProperties();
  }, []);

  return <h1>Teste Supabase</h1>;
}

export default Test;
