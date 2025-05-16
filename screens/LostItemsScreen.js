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
} from 'react-native';

export default function LostItemsScreen() {
  const [lostItems, setLostItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const fetchLostItems = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/lost_items.php');
      const data = await response.json();
      const items = data.items || [];
      setLostItems(items);
      setFilteredItems(items);
    } catch (error) {
      console.error('Error fetching lost items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  useEffect(() => {
    const filtered = lostItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, locationFilter, lostItems]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLostItems();
  };

  const handleClaim = (item) => {
    Alert.alert('Claim Item', `You are claiming: ${item.name}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Proceed', onPress: () => console.log('Claimed:', item.name) },
    ]);
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
        <Text style={styles.location}>Last seen: {item.location}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <TouchableOpacity
          style={styles.claimButton}
          onPress={() => handleClaim(item)}
        >
          <Text style={styles.claimText}>Claim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#006400" />
        <Text>Loading lost items...</Text>
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
        ListEmptyComponent={<Text style={styles.empty}>No matching lost items.</Text>}
      />
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
  claimButton: {
    marginTop: 6,
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#007b5f',
    alignSelf: 'flex-start',
  },
  claimText: {
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
});
// This code is a React Native component for a "Lost Items" screen in a mobile application.
// It fetches lost items from a backend API, displays them in a list, and allows users to search and filter the items.