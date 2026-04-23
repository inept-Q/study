import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
import { ShelfCard } from '@/components/ShelfCard';
import { useVaultStore } from '@/store/useVaultStore';

export default function HomeScreen() {
  const { workspace, createShelf } = useVaultStore();
  const [title, setTitle] = useState('');

  const normalShelves = useMemo(
    () => workspace.shelves.filter((s) => !s.favorite),
    [workspace.shelves]
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f1eb' }} contentContainerStyle={{ padding: 18, paddingBottom: 40 }}>
      <Text style={{ fontSize: 30, fontWeight: '800', color: '#221d18' }}>StudyVault</Text>
      <Text style={{ marginTop: 6, color: '#6d6258', lineHeight: 20 }}>
        Local-first shelves and documents, ready to connect to Firebase and deploy from GitHub for the web.
      </Text>

      <View style={{ marginTop: 18, backgroundColor: '#fff', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#e7e1d8' }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Create shelf</Text>
        <TextInput
          placeholder="Shelf name"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 1, borderColor: '#ddd4ca', borderRadius: 12, padding: 12, backgroundColor: '#fcfbf9' }}
        />
        <Pressable
          onPress={() => {
            if (!title.trim()) {
              Alert.alert('Add a shelf name first');
              return;
            }
            createShelf(title.trim());
            setTitle('');
          }}
          style={{ marginTop: 10, backgroundColor: '#275f49', padding: 12, borderRadius: 12 }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Add shelf</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 18 }}>
        {normalShelves.map((shelf) => (
          <Link key={shelf.id} href={{ pathname: '/shelf/[id]', params: { id: shelf.id } }} asChild>
            <View>
              <ShelfCard shelf={shelf} onPress={() => {}} />
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
