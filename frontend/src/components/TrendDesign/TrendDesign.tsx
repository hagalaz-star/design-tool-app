import styles from "./TrendDesign.scss";
import axios from "axios";
import { ComponentType } from "react";
import { useState } from "react";

interface TrendDesignVariant {
  designName: string;
  code: string;
  description: string;
}

interface TrendDesignImage {
  imageUrl: string;
  imageAlt: string;
  styleName: string;
}

interface TrendDesignProps {
  componentType: ComponentType;
  selectTrendDesign: (code: string) => void;
}

function TrendDesign({ componentType, selectTrendDesign }: TrendDesignProps) {
  const [trendCode, setTrendCode] = useState<TrendDesignVariant | null>(null);
  const [trendImage, setTrendImage] = useState<TrendDesignImage | null>(null);
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const trendDesignChoice = async()=>{
    setLoading(true)
    setError("")
    setTrendCode(null)
    setTrendImage(null)

    const trendPrompt = 
  }
  return <></>;
}

export default TrendDesign;
