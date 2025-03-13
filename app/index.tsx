import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { Text } from "~/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

export default function Index() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleSubmit = () => {
    // Add https:// prefix if not present
    let formattedUrl = url;
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }
    setCurrentUrl(formattedUrl);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <View className="p-4 flex-1">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Web Viewer</CardTitle>
            <CardDescription>Enter a URL to view a website</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="flex-row space-x-2">
              <TextInput
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground"
                placeholder="Enter website URL"
                placeholderTextColor="#9CA3AF"
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                keyboardType="url"
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-md justify-center"
                onPress={handleSubmit}
              >
                <Text className="text-primary-foreground font-semibold">Go</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>

        {loading && (
          <View className="h-2 bg-muted rounded-full mb-4 overflow-hidden">
            <View 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${progress * 100}%` }} 
            />
          </View>
        )}
        
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-0 flex-1">
            {currentUrl ? (
              <WebView
                source={{ uri: currentUrl }}
                className="flex-1"
                startInLoadingState={true}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
                renderLoading={() => (
                  <View className="absolute inset-0 justify-center items-center bg-card">
                    <Text className="text-muted-foreground">Loading...</Text>
                  </View>
                )}
              />
            ) : (
              <View className="flex-1 justify-center items-center p-6">
                <Text className="text-muted-foreground text-center">
                  Enter a URL above to view a website
                </Text>
              </View>
            )}
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}
