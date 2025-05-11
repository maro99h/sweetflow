
export interface Order {
  id: string;
  user_id: string;
  client_name: string;
  product_name: string;
  quantity: number;
  delivery_date: string;
  delivery_time: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderFormValues = {
  clientName: string;
  productName: string;
  quantity: number;
  deliveryDate: string;
  deliveryTime?: string;
  notes?: string;
};
