import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Alert,
  Modal,
  Button,
  Platform,
  Picker,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FoundItemsScreen() {
  const [foundItems, setFoundItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    image: null,
    finderPhone: '',
    residency: '',
    hostel: '',
  });

  const fetchFoundItems = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/found_items.php');
      const data = await response.json();
      const items = data.items || [];
      setFoundItems(items);
      setFilteredItems(items);
    } catch (error) {
      console.error('Error fetching found items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  useEffect(() => {
    const filtered = foundItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, locationFilter, foundItems]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFoundItems();
  };

  const handleMatchOwner = (item) => {
    Alert.alert('Match Owner', `Trying to find the owner of: ${item.name}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Proceed', onPress: () => console.log('Match initiated for:', item.name) },
    ]);
  };

  // Camera/image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setNewItem({ ...newItem, image: result.assets[0].uri });
    }
  };

  const handleAddFoundItem = async () => {
    if (
      !newItem.name ||
      !newItem.description ||
      !newItem.location ||
      !newItem.date ||
      !newItem.finderPhone ||
      !newItem.residency ||
      (newItem.residency === 'on' && !newItem.hostel)
    ) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    // ===== PLACE TO SEND NEW ITEM TO BACKEND =====
    // You will need to send the image as multipart/form-data if you want to upload it!
    // Example:
    // let formData = new FormData();
    // formData.append('name', newItem.name);
    // formData.append('description', newItem.description);
    // formData.append('location', newItem.location);
    // formData.append('date', newItem.date);
    // formData.append('finderPhone', newItem.finderPhone);
    // formData.append('residency', newItem.residency);
    // formData.append('hostel', newItem.hostel);
    // if (newItem.image) {
    //   formData.append('image', {
    //     uri: newItem.image,
    //     name: 'photo.jpg',
    //     type: 'image/jpeg',
    //   });
    // }
    // await fetch('http://your-backend-url/api/add_found_item.php', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    // =============================================
    setModalVisible(false);
    setNewItem({
      name: '',
      description: '',
      location: '',
      date: '',
      image: null,
      finderPhone: '',
      residency: '',
      hostel: '',
    });
    fetchFoundItems(); // Refresh list
    Alert.alert('Success', 'Found item added (not really, just frontend for now).');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={{ color: '#888' }}>No Image</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.location}>Found at: {item.location}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.finder}>Finder: {item.finderPhone} {item.residency === 'on' ? `(${item.hostel})` : '(Off campus)'}</Text>
        <TouchableOpacity
          style={styles.matchButton}
          onPress={() => handleMatchOwner(item)}
        >
          <Text style={styles.matchText}>Match Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007b5f" />
        <Text>Loading found items...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by item name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TextInput
          style={styles.input}
          placeholder="Filter by location"
          value={locationFilter}
          onChangeText={setLocationFilter}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No matching found items.</Text>}
      />

      {/* Floating "+" Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: '#fff', fontSize: 32 }}>+</Text>
      </TouchableOpacity>

      {/* Modal for adding new found item */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Add Found Item</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {newItem.image ? (
                <Image source={{ uri: newItem.image }} style={styles.imagePreview} />
              ) : (
                <Text style={{ color: '#007AFF' }}>Take a Picture</Text>
              )}
            </TouchableOpacity>
            <TextInput
              placeholder="Item Name"
                placeholderTextColor="#888"
              style={styles.input}
              value={newItem.name}
              onChangeText={text => setNewItem({ ...newItem, name: text })}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#888"
              style={styles.input}
              value={newItem.description}
              onChangeText={text => setNewItem({ ...newItem, description: text })}
            />
            <TextInput
              placeholder="Location Found"
              placeholderTextColor="#888"
              style={styles.input}
              value={newItem.location}
              onChangeText={text => setNewItem({ ...newItem, location: text })}
            />
            <TextInput
              placeholder="Date"
              placeholderTextColor="#888"
              style={styles.input}
              value={newItem.date}
              onChangeText={text => setNewItem({ ...newItem, date: text })}
            />
            <TextInput
              placeholder="Your Phone Number"
              placeholderTextColor="#888"
              style={styles.input}
              value={newItem.finderPhone}
              onChangeText={text => setNewItem({ ...newItem, finderPhone: text })}
              keyboardType="phone-pad"
            />
            <Text style={{ marginTop: 8 }}>Residency Status</Text>
            <View style={styles.residencyRow}>
              <TouchableOpacity
                style={[
                  styles.residencyButton,
                  newItem.residency === 'on' && styles.residencyButtonSelected,
                ]}
                onPress={() => setNewItem({ ...newItem, residency: 'on' })}
              >
                <Text style={newItem.residency === 'on' ? styles.residencyTextSelected : styles.residencyText}>On Campus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.residencyButton,
                  newItem.residency === 'off' && styles.residencyButtonSelected,
                ]}
                onPress={() => setNewItem({ ...newItem, residency: 'off', hostel: '' })}
              >
                <Text style={newItem.residency === 'off' ? styles.residencyTextSelected : styles.residencyText}>Off Campus</Text>
              </TouchableOpacity>
            </View>
            {newItem.residency === 'on' && (
              <TextInput
                placeholder="Hostel/Hall Name"
                placeholderTextColor="#888"
                style={styles.input}
                value={newItem.hostel}
                onChangeText={text => setNewItem({ ...newItem, hostel: text })}
              />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button title="Cancel" color="#888" onPress={() => setModalVisible(false)} />
              <Button title="Add" color="#007AFF" onPress={handleAddFoundItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fefefe',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  finder: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
  },
  matchButton: {
    marginTop: 6,
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#006400',
    alignSelf: 'flex-start',
  },
  matchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fafafa',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  imagePicker: {
    backgroundColor: '#e6f0fa',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  residencyRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  residencyButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  residencyButtonSelected: {
    backgroundColor: '#007AFF',
  },
  residencyText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  residencyTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});