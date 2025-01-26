import { View, Text, StyleSheet, Platform } from "react-native";
import { useMigrations } from "drizzle-orm/op-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import { drizzle } from "drizzle-orm/op-sqlite";
import { open } from "@op-engineering/op-sqlite";

const opsqlite = open({
  name: "new",
});
const db = drizzle(opsqlite);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error(error);
    return (
      <View style={styles.container}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Success</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
