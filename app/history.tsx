import React from "react";
import { View, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useNavigationHistory } from "~/lib/navigation-history";
import { router } from "expo-router";
import { ArrowLeft, Trash2 } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";

iconWithClassName(ArrowLeft);
iconWithClassName(Trash2);

// eslint-disable-next-line react/function-component-definition
export default function HistoryPage() {
  const { getHistory, clearHistory } = useNavigationHistory();
  const history = getHistory();

  const handleSelectUrl = (url: string) => {
    router.navigate({
      pathname: "/",
      params: { url }
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleClearHistory = () => {
    clearHistory();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <View className="p-4 flex-1">
        <Card className="flex-1">
          <CardHeader>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity onPress={handleGoBack} className="p-2">
                  <ArrowLeft size={24} className="text-primary" />
                </TouchableOpacity>
                <CardTitle>Browsing History</CardTitle>
              </View>
              {history.length > 0 && (
                <TouchableOpacity onPress={handleClearHistory} className="p-2">
                  <Trash2 size={20} className="text-destructive" />
                </TouchableOpacity>
              )}
            </View>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <FlatList
                data={history.slice().reverse()} // Show newest first
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    onPress={() => handleSelectUrl(item)}
                    className="py-4 border-b border-border"
                  >
                    <Text className="text-foreground" numberOfLines={1}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="flex-1 justify-center items-center py-10">
                <Text className="text-muted-foreground text-center">
                  No browsing history yet
                </Text>
              </View>
            )}
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}
