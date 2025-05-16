import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(true); // Start in editing mode if fields are empty

  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [residency, setResidency] = useState('Resident');
  const [hall, setHall] = useState('');
  const [number, setNumber] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setEditing(false);
    // Save changes to backend or context here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#aaa', fontSize: 32 }}>+</Text>
          </View>
        )}
        <Text style={styles.editPicText}>Edit Profile Picture</Text>
      </TouchableOpacity>

      {editing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={course}
            onChangeText={setCourse}
            placeholder="Course"
          />
          <TextInput
            style={styles.input}
            value={level}
            onChangeText={setLevel}
            placeholder="Level"
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <TouchableOpacity
              style={[
                styles.residencyButton,
                residency === 'Resident' && styles.residencySelected,
              ]}
              onPress={() => setResidency('Resident')}
            >
              <Text>Resident</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.residencyButton,
                residency === 'Non-Resident' && styles.residencySelected,
              ]}
              onPress={() => setResidency('Non-Resident')}
            >
              <Text>Non-Resident</Text>
            </TouchableOpacity>
          </View>
          {residency === 'Resident' ? (
            <TextInput
              style={styles.input}
              value={hall}
              onChangeText={setHall}
              placeholder="Hall/Hostel"
            />
          ) : (
            <TextInput
              style={styles.input}
              value={number}
              onChangeText={setNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          )}
          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.info}>Course: {course}</Text>
          <Text style={styles.info}>Level: {level}</Text>
          <Text style={styles.info}>Residency: {residency}</Text>
          {residency === 'Resident' ? (
            <Text style={styles.info}>Hall/Hostel: {hall}</Text>
          ) : (
            <Text style={styles.info}>Phone Number: {number}</Text>
          )}
          <Button title="Edit Profile" onPress={() => setEditing(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 12, backgroundColor: '#eee' },
  editPicText: { color: '#007AFF', marginBottom: 24 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 16, marginBottom: 4, textAlign: 'center' },
  email: { fontSize: 16, color: '#555', marginBottom: 8, textAlign: 'center' },
  info: { fontSize: 16, color: '#333', marginBottom: 4, textAlign: 'center' },
  residencyButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  residencySelected: {
    backgroundColor: '#007AFF22',
  },
});