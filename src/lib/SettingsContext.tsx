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
    yearSettings: YearSettingsInterface;
  };
  chart2Settings: {
    provinceSettings: ProvinceSettingsInterface;
    nocSettings: NocSettingsInterface;
    yearSettings: YearSettingsInterface;
  };
}

export const SettingsContext = createContext<SettingsContextInterface>({
  mapSettings: {
    nocSettings: {
      value: "",
      setValue: (value: string) => {},
    },
    yearSettings: {
      value: "",
      setValue: (value: string) => {},
    },
  },
  chart1Settings: {
    provinceSettings: {
      value: "",
      setValue: (value: string) => {},
    },
    nocSettings: {
      value: "",
      setValue: (value: string) => {},
    },
    yearSettings: {
      value: "",
      setValue: (value: string) => {},
    },
  },
  chart2Settings: {
    provinceSettings: {
      value: "",
      setValue: (value: string) => {},
    },
    nocSettings: {
      value: "",
      setValue: (value: string) => {},
    },
    yearSettings: {
      value: "",
      setValue: (value: string) => {},
    },
  },
});

export const SettingsProvider = ({ children }: PropsWithChildren<any>) => {
  const [mapNocValue, setMapNocValue] = useState(NocOptions[0]);
  const [mapYearValue, setMapYearValue] = useState(YearOptions[0]);

  const [chart1ProvinceValue, setChart1ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart1YearValue, setChart1YearValue] = useState(YearOptions[0]);
  const [chart1NocValue, setChart1NocValue] = useState(NocOptions[0]);

  const [chart2ProvinceValue, setChart2ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart2YearValue, setChart2YearValue] = useState(YearOptions[0]);
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
      yearSettings: {
        value: chart1YearValue,
        setValue: (value: string) => {
          setChart1YearValue(value);
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
      yearSettings: {
        value: chart2YearValue,
        setValue: (value: string) => {
          setChart2YearValue(value);
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
