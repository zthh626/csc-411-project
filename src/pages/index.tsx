import Chart from "../components/Chart";
import { Dropdown } from "../components/Dropdown";
import {
  NocOptions,
  ProvinceOptions,
  YearOptions,
  ProvinceAbbOptions,
} from "../lib/Options";
import { useSettingsContext } from "../lib/SettingsContext";
import CanadaMap from "../components/CanadaMap";
import { useEffect, useState } from "react";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  useRangeSlider,
} from "@chakra-ui/react";

export default function Map() {
  const { nocSettings, chart1Settings, chart2Settings, yearSettings } =
    useSettingsContext();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const onYearChange = (value: number[]) => {
    yearSettings.yearSettingsStart.setValue(value[0]);
    yearSettings.yearSettingsEnd.setValue(value[1]);
  };

  useEffect(() => {
    const updateStartYear = () => {
      if (!isAnimationPlaying || yearSettings.yearSettingsStart.value > 2017) {
        setIsAnimationPlaying(false);
        return;
      }
      const yearIndex = YearOptions.findIndex((year) => {
        return year === yearSettings.yearSettingsStart.value;
      });
      yearSettings.yearSettingsStart.setValue(YearOptions[yearIndex + 1]);
    };

    const animationInterval = setInterval(() => {
      updateStartYear();
    }, 750);

    return () => clearInterval(animationInterval);
  }, [isAnimationPlaying, yearSettings.yearSettingsStart.value]);

  return (
    <div className="flex justify-center w-full bg-gray-200">
      <div className="flex flex-col w-full p-4 space-y-10 max-w-7xl">
        <section>
          <h1 className="text-3xl font-bold">
            Job Trends During Volatile Times
          </h1>
        </section>
        <section className="flex flex-row justify-between py-3">
          <div className="flex flex-row space-x-10">
            <div className="flex flex-row items-center space-x-5">
              {isAnimationPlaying ? (
                <PauseCircleIcon
                  onClick={() => {
                    setIsAnimationPlaying(false);
                  }}
                  className="w-7 h-7 fill-gray-700 hover:cursor-pointer"
                />
              ) : (
                <PlayCircleIcon
                  onClick={() => {
                    setIsAnimationPlaying(true);
                  }}
                  className="w-7 h-7 fill-gray-700 hover:cursor-pointer"
                />
              )}
              <RangeSlider
                defaultValue={[2006, 2021]}
                min={2006}
                max={2021}
                step={1}
                width={300}
                onChange={onYearChange}
                value={[
                  yearSettings.yearSettingsStart.value,
                  yearSettings.yearSettingsEnd.value,
                ]}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
                <RangeSliderMark
                  value={yearSettings.yearSettingsStart.value}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {yearSettings.yearSettingsStart.value}
                </RangeSliderMark>
                <RangeSliderMark
                  value={Number(yearSettings.yearSettingsEnd.value)}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {yearSettings.yearSettingsEnd.value}
                </RangeSliderMark>
              </RangeSlider>
            </div>
            <Dropdown
              value={nocSettings.value}
              setValue={nocSettings.setValue}
              options={NocOptions}
              size="lg"
            />
          </div>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold -ml-28">
              Percentage Change In Jobs By Province
            </h1>
            <div className="flex flex-col items-center justify-start -mt-20 space-y-10">
              <CanadaMap
                fillColor="#50aaeb"
                onHoverColor="#a1d7ff"
                height={700}
                width={753}
                onClick={(province: string) => {
                  console.log(province);
                }}
                startYear={yearSettings.yearSettingsStart.value.toString()}
                endYear={yearSettings.yearSettingsEnd.value.toString()}
                occupation={nocSettings.value}
              />
            </div>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <h1 className="self-center text-lg font-semibold">
              Change in Employment Per Year By Province and Occupation
            </h1>
            <Dropdown
              value={chart1Settings.provinceSettings.value}
              setValue={chart1Settings.provinceSettings.setValue}
              options={ProvinceOptions}
              size="md"
            />
            <Chart chartSettings={chart1Settings} />
            <Dropdown
              value={chart2Settings.provinceSettings.value}
              setValue={chart2Settings.provinceSettings.setValue}
              options={ProvinceOptions}
              size="md"
            />
            <Chart chartSettings={chart2Settings} />
          </div>
        </section>
      </div>
    </div>
  );
}
