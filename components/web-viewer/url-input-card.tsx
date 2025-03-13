import React, { useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { NavigationControls } from "./navigation-controls";
import {  HandMetal, History } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { router } from "expo-router";

iconWithClassName(History);
iconWithClassName(HandMetal);

interface UrlInputCardProps {
  url: string;
  displayUrl: string;
  onUrlChange: (text: string) => void;
  onSubmit: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onClearUrl: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const UrlInputCard = ({ 
  url, 
  displayUrl, 
  onUrlChange, 
  onSubmit,
  onGoBack,
  onGoForward,
  onRefresh,
  onClearUrl,
  canGoBack,
  canGoForward
}: UrlInputCardProps) => {
  const inputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    if (displayUrl !== url) {
      onUrlChange(displayUrl);
    }
  }, [ displayUrl ]);

  const navigateToHistory = () => {
    router.navigate("/history");
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={onClearUrl}
            className="flex-row items-center space-x-2"
          >
            <HandMetal size={20} className="text-primary mr-2" />
            <CardTitle>Bro-ser</CardTitle>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <NavigationControls 
              onGoBack={onGoBack}
              onGoForward={onGoForward}
              onRefresh={onRefresh}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
            />
            <TouchableOpacity 
              onPress={navigateToHistory}
              className="p-2"
            >
              <History size={24} className="text-primary" />
            </TouchableOpacity>
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <View className="flex-row space-x-2">
          <TextInput
            ref={inputRef}
            className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-foreground"
            placeholder="Enter website URL"
            placeholderTextColor="#9CA3AF"
            value={url}
            onChangeText={onUrlChange}
            autoCapitalize="none"
            keyboardType="url"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity
            className="bg-primary px-4 py-2 rounded-md justify-center"
            onPress={onSubmit}
          >
            <Text className="text-primary-foreground font-semibold">Go</Text>
          </TouchableOpacity>
        </View>
      </CardContent>
    </Card>
  );
};
