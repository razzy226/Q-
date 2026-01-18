export {};

type GoogleMapsLibrary = {
  maps: {
    importLibrary: (libraryName: string) => Promise<unknown>;
    places?: {
      PlaceAutocompleteElement?: new () => HTMLElement;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsLibrary;
  }

  const google: GoogleMapsLibrary;
}
