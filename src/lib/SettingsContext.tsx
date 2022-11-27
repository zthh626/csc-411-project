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
  value: number;
  setValue: (value: number) => void;
}

export interface ChartSettingsInterface {
  provinceSettings: ProvinceSettingsInterface;
}

export interface SettingsContextInterface {
  nocSettings: NocSettingsInterface;
  chart1Settings: ChartSettingsInterface;
  chart2Settings: ChartSettingsInterface;
  yearSettings: {
    yearSettingsStart: YearSettingsInterface;
    yearSettingsEnd: YearSettingsInterface;
  };
}

export const SettingsContext = createContext<SettingsContextInterface>({
  nocSettings: {
    value: "",
    setValue: (_value: string) => {},
  },
  chart1Settings: {
    provinceSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
  },
  chart2Settings: {
    provinceSettings: {
      value: "",
      setValue: (_value: string) => {},
    },
  },
  yearSettings: {
    yearSettingsStart: {
      value: 2006,
      setValue: (_value: number) => {},
    },
    yearSettingsEnd: {
      value: 2021,
      setValue: (_value: number) => {},
    },
  },
});

export const SettingsProvider = ({ children }: PropsWithChildren<any>) => {
  const [nocValue, setNocValue] = useState(NocOptions[0]);
  const [mapYearValueStart, setMapYearValueStart] = useState(YearOptions[0]);
  const [mapYearValueEnd, setMapYearValueEnd] = useState(YearOptions[15]);

  const [chart1ProvinceValue, setChart1ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart1NocValue, setChart1NocValue] = useState(NocOptions[0]);

  const [chart2ProvinceValue, setChart2ProvinceValue] = useState(
    ProvinceOptions[0]
  );
  const [chart2NocValue, setChart2NocValue] = useState(NocOptions[0]);

  const provider: SettingsContextInterface = {
    nocSettings: {
      value: nocValue,
      setValue: (value: string) => {
        setNocValue(value);
      },
    },
    chart1Settings: {
      provinceSettings: {
        value: chart1ProvinceValue,
        setValue: (value: string) => {
          setChart1ProvinceValue(value);
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
    },
    yearSettings: {
      yearSettingsStart: {
        value: mapYearValueStart,
        setValue: (value: number) => {
          setMapYearValueStart(value);
        },
      },
      yearSettingsEnd: {
        value: mapYearValueEnd,
        setValue: (value: number) => {
          setMapYearValueEnd(value);
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
