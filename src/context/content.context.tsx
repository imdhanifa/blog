/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, } from "react";

type ContentMeta = {
  contentType?: "portfolio" | "home" | "docs" | string;
  title?: string;
  showSidebar?: boolean;
  hideFooter?: boolean;
};

const defaultMeta: ContentMeta = { contentType: "home", title: "Site" };

const ContentContext = createContext<{
  meta: ContentMeta;
  setMeta: (m: ContentMeta) => void;
}>({
  meta: defaultMeta,
  setMeta: () => {},
});

export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [meta, setMeta] = useState<ContentMeta>(defaultMeta);
  return (
    <ContentContext.Provider value={{ meta, setMeta }}>
      {children}
    </ContentContext.Provider>
  );
}
