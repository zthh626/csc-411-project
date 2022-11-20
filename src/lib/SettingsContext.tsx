import { createContext, PropsWithChildren, useContext, useState } from "react";
import { NocOptions, ProvinceOptions, YearOptions } from "./Options";

export interface NocSettingsInterface {
  value: string;
  setValue: (value: string) => void;
}

export interface ProvinceSettingsInterface {
  value: string;
  setValue: (value: string) => void;
}

export interface YearSettingsInterface {
  value: string;
  setValue: (value: string) => void;
}

export interface SettingsContextInterface {
  mapSettings: {
    nocSettings: NocSettingsInterface;
    yearSettings: YearSettingsInterface;
  };
  chart1Settings: {
    provinceSettings: ProvinceSettingsInterface;
    nocSettings: NocSettingsInterface;
  };
  chart2Settings: {
    provinceSettings: ProvinceSettingsInterface;
    nocSettings: NocSettingsInterface;
  };
}

export const SettingsContext = createContext<SettingsContextInterface>({
  mapSettings: {
    nocSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
    yearSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
  },
  chart1Settings: {
    provinceSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
    nocSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
  },
  chart2Settings: {
    provinceSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
    nocSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
  },
});

export const SettingsProvider = ({ children }: PropsWithChildren<any>) => {
  const [mapNocValue, setMapNocValue] = useState(NocOptions[0]);
  const [mapYearValue, setMapYearValue] = useState(YearOptions[0]);

  const [chart1ProvinceValue, setChart1ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart1NocValue, setChart1NocValue] = useState(NocOptions[0]);

  const [chart2ProvinceValue, setChart2ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart2NocValue, setChart2NocValue] = useState(NocOptions[0]);

  const provider: SettingsContextInterface = {
    mapSettings: {
      nocSettings: {
        value: mapNocValue,
        setValue: (value: string) => {
          setMapNocValue(value);
        },
      },
      yearSettings: {
        value: mapYearValue,
        setValue: (value: string) => {
          setMapYearValue(value);
        },
      },
    },
    chart1Settings: {
      provinceSettings: {
        value: chart1ProvinceValue,
        setValue: (value: string) => {
          setChart1ProvinceValue(value);
        },
      },
      nocSettings: {
        value: chart1NocValue,
        setValue: (value: string) => {
          setChart1NocValue(value);
        },
      },
    },
    chart2Settings: {
      provinceSettings: {
        value: chart2ProvinceValue,
        setValue: (value: string) => {
          setChart2ProvinceValue(value);
        },
      },
      nocSettings: {
        value: chart2NocValue,
        setValue: (value: string) => {
          setChart2NocValue(value);
        },
      },
    },
  };

  return (
    <SettingsContext.Provider value={provider}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext<SettingsContextInterface>(SettingsContext);
};
