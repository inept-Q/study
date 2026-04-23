import { Pressable, Text, View } from 'react-native';
import { Shelf } from '@/types/models';

export function ShelfCard({ shelf, onPress }: { shelf: Shelf; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: shelf.background || '#ffffff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e7e1d8'
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#241f19' }}>{shelf.title}</Text>
      <Text style={{ marginTop: 4, color: '#6f655a' }}>{shelf.description || 'No description yet.'}</Text>
      <Text style={{ marginTop: 10, color: '#9a8f84' }}>{shelf.files.length} item(s)</Text>
    </Pressable>
  );
}
