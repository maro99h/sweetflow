
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

// This type is used for type assertions when working with Supabase
export type PostgrestResponse<T> = {
  data: T;
  error: Error | null;
};

// Database type that includes the orders table for typecasting
export type Database = {
  public: {
    Tables: {
      orders: {
        Row: Order;
      };
      profiles: {
        Row: {
          business_name: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
      };
    };
  };
};
