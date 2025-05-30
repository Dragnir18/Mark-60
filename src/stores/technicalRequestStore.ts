import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { TechnicalRequest } from '../types';
import { toast } from 'react-hot-toast';

interface TechnicalRequestState {
  requests: TechnicalRequest[];
  loading: boolean;
  error: string | null;
  fetchRequests: (userId?: string) => Promise<void>;
  createRequest: (request: Partial<TechnicalRequest>) => Promise<void>;
  updateRequest: (id: string, updates: Partial<TechnicalRequest>) => Promise<void>;
}

export const useTechnicalRequestStore = create<TechnicalRequestState>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async (userId?: string) => {
    try {
      set({ loading: true, error: null });
      let query = supabase.from('technical_requests').select(`
        *,
        service:services(*),
        technician:profiles!technician_id(*),
        user:profiles!user_id(*)
      `);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      set({ requests: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching requests:', error);
      set({ error: 'Failed to fetch requests', loading: false });
    }
  },

  createRequest: async (request) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('technical_requests')
        .insert([request])
        .select()
        .single();

      if (error) throw error;
      
      set((state) => ({
        requests: [data, ...state.requests],
        loading: false
      }));
      
      toast.success('Service request created successfully');
    } catch (error) {
      console.error('Error creating request:', error);
      set({ error: 'Failed to create request', loading: false });
      toast.error('Failed to create service request');
    }
  },

  updateRequest: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('technical_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        requests: state.requests.map((req) => 
          req.id === id ? { ...req, ...data } : req
        ),
        loading: false
      }));

      toast.success('Service request updated successfully');
    } catch (error) {
      console.error('Error updating request:', error);
      set({ error: 'Failed to update request', loading: false });
      toast.error('Failed to update service request');
    }
  }
}));