import { useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useVaultStore } from '@/store/useVaultStore';

export default function ShelfScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { workspace, importFile } = useVaultStore();
  const shelf = workspace.shelves.find((item) => item.id === id);

  if (!shelf) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f1eb' }}>
        <Text>Shelf not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f1eb' }} contentContainerStyle={{ padding: 18, paddingBottom: 40 }}>
      <Text style={{ fontSize: 28, fontWeight: '800', color: '#221d18' }}>{shelf.title}</Text>
      <Text style={{ marginTop: 6, color: '#6d6258' }}>{shelf.description || 'No description yet.'}</Text>

      <Pressable
        onPress={() => importFile(shelf.id).catch(() => Alert.alert('Import failed'))}
        style={{ marginTop: 16, backgroundColor: '#275f49', padding: 12, borderRadius: 12 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Import file</Text>
      </Pressable>

      <View style={{ marginTop: 18, gap: 10 }}>
        {shelf.files.map((file) => (
          <View key={file.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e7e1d8' }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#241f19' }}>{file.name}</Text>
            <Text style={{ marginTop: 4, color: '#6f655a', textTransform: 'uppercase' }}>{file.type}</Text>
            <Text style={{ marginTop: 8, color: '#9a8f84' }}>
              {file.localUri ? 'Stored locally' : 'No local file path'}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
