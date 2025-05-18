export interface WaterData {
  Battery_V: number;
  Water_Temperature: number;
  Water_Level: number;
  Barometric_Pressure: number;
  Date_Time: string;
  Anomaly: string;
}

export const fetchWaterData = async (): Promise<WaterData[]> => {
  try {
    const response = await fetch('https://api-creation-1hfb.onrender.com/data');
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data: WaterData[] = await response.json();
    
    // Sort data by date ascending to ensure chronological order
    return data.sort((a, b) => {
      return new Date(a.Date_Time).getTime() - new Date(b.Date_Time).getTime();
    });
  } catch (error) {
    console.error('Error fetching water data:', error);
    throw error;
  }
};