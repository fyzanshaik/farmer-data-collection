import supabase from '../lib/supabase';

export const uploadFile = async (file: Buffer, path: string) => {
	const { data, error } = await supabase.storage.from('farmers').upload(path, file);
	if (error) throw error;
	const {
		data: { publicUrl },
	} = supabase.storage.from('farmers').getPublicUrl(data.path);
	return publicUrl;
};
