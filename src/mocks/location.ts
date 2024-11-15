export type LocationType = {
  key: React.Key;
  itemKey?: React.Key;
  namaLokasi: string;
  gudang: string;
  jenis: string;
  volume: string;
  deskripsi: string;
};

const generateMockLocation = (count: number): LocationType[] => {
  return Array.from({ length: count }, (_, index) => ({
    key: index,
    namaLokasi: `Lokasi ${index + 1}`,
    gudang: `Gudang ${index + 1}`,
    jenis: `Jenis ${index + 1}`,
    volume: `${index + 1} PCS`,
    deskripsi: `Deskripsi ${index + 1}`,
  }));
};

export default generateMockLocation;
