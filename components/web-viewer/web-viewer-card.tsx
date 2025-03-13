import React, { useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";

interface WebViewerCardProps {
  url: string;
  loading: boolean;
  progress: number;
  onLoadStart: () => void;
  onLoadEnd: () => void;
  onLoadProgress: (progress: number) => void;
  onNavigationStateChange: (event: any) => void;
  webViewRef: React.RefObject<WebView>;
}

export const WebViewerCard = ({
  url,
  loading,
  progress,
  onLoadStart,
  onLoadEnd,
  onLoadProgress,
  onNavigationStateChange,
  webViewRef,
}: WebViewerCardProps) => {
  return (
    <>
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
          {url ? (
            <WebView
              ref={webViewRef}
              source={{ uri: url }}
              className="flex-1"
              startInLoadingState={true}
              onLoadStart={onLoadStart}
              onLoadEnd={onLoadEnd}
              onLoadProgress={({ nativeEvent }) => onLoadProgress(nativeEvent.progress)}
              onNavigationStateChange={onNavigationStateChange}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
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
    </>
  );
};
