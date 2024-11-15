import { LocationType } from "./location";

type Item = {
  key: React.Key;
  kodeBarang: string;
  namaBarang: string;
  merk: string;
  jenisBarang: string;
  gudang: string;
  totalStock: number;
  locationList?: LocationType[];
};

// Helper function to generate a random 3-digit number
const getRandomThreeDigitNumber = (): string => {
  return Math.floor(100 + Math.random() * 900).toString();
};

// Helper function to randomly select either "BALL" or "UNIT"
const getRandomType = (): string => {
  return Math.random() < 0.5 ? "BALL" : "UNIT";
};

const generateMockItems = (count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    key: index,
    kodeBarang: `GMI-${getRandomThreeDigitNumber()}-${getRandomType()}`,
    namaBarang: `GMI-${getRandomThreeDigitNumber()}-${getRandomType()}`,
    merk: `Merk ${index + 1}`,
    jenisBarang: `Jenis Barang ${index + 1}`,
    gudang: `Gudang ${index + 1}`,
    totalStock: 1 + Math.floor(Math.random() * 100),
  }));
};

export default generateMockItems;
