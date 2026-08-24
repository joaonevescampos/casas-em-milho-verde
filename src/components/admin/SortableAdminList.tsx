// components/admin/SortableAdminList.tsx
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { supabase } from '@/lib/supabase';
import AdminCard from './AdminCard';
import SortableItem from './SortableItem';
import { toast } from 'react-toastify';
import type { Property } from '@/types/properties';

interface SortableAdminListProps {
  properties: Property[];
  findImage: (id: string) => string | undefined;
  handleEditProperty: (id: string) => void;
  handleDeleteProperty: (id: string) => void;
  onOrderChange: () => void;
}

// Type guard para verificar se a propriedade tem ID válido
function hasValidId(property: Property): property is Property & { id: string } {
  return property.id !== undefined && property.id !== null && property.id.length > 0;
}

const SortableAdminList: React.FC<SortableAdminListProps> = ({
  properties,
  findImage,
  handleEditProperty,
  handleDeleteProperty,
  onOrderChange,
}) => {
  // Filtrar apenas propriedades com ID válido
  const validItems = properties.filter(hasValidId);
  
  const [items, setItems] = useState<(Property & { id: string })[]>(validItems);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const valid = properties.filter(hasValidId);
    setItems(valid);
  }, [properties]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || isUpdating) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    try {
      setIsUpdating(true);

      // Atualizar ordem no banco - usando update individual
      const updatePromises = newItems.map((item, index) =>
        supabase
          .from('properties')
          .update({ order: index })
          .eq('id', item.id)
      );

      const results = await Promise.all(updatePromises);
      
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw errors[0].error;
      }

      toast.success('Ordem atualizada com sucesso!');
      onOrderChange();
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
      toast.error('Erro ao salvar a ordem dos anúncios.');
      setItems(validItems);
    } finally {
      setIsUpdating(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-500">Nenhum anúncio encontrado</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2 w-full h-[calc(100vh-250px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 pr-4">
          {items.map((property) => (
            <SortableItem key={property.id} id={property.id}>
              <li className="w-full">
                <AdminCard
                  propertyId={property.id}
                  purpose={property.purpose}
                  city={property.city}
                  state={property.state}
                  title={property.title}
                  description={property.description}
                  guests={property.guests ?? 0}
                  beds={property.beds ?? 0}
                  bedroom={property.bedrooms ?? 0}
                  bathroom={property.bathrooms ?? 0}
                  emphasis1={property.emphasis1 ?? ''}
                  emphasis2={property.emphasis2 ?? ''}
                  emphasis3={property.emphasis3 ?? ''}
                  emphasis4={property.emphasis4 ?? ''}
                  coverImage={findImage(property.id)}
                  is_featured={property.is_featured}
                  onEdit={() => handleEditProperty(property.id)}
                  onDelete={() => handleDeleteProperty(property.id)}
                />
              </li>
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default SortableAdminList;