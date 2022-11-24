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

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
} from "@chakra-ui/react";
import Slider from "@mui/material/Slider";

export default function Map() {
  const { mapSettings, chart1Settings, chart2Settings } = useSettingsContext();

  const onYearChange = (value: number[]) => {
    mapSettings.yearSettingsStart.setValue(value[0])
    mapSettings.yearSettingsEnd.setValue(value[1])
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-7xl p-4 space-y-10">
        <section>
          <h1 className="font-bold text-3xl">
            Job Trends During Volatile Times
          </h1>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex space-x-2">
            {/* <Dropdown
              value={mapSettings.yearSettings.value}
              setValue={mapSettings.yearSettings.setValue}
              options={YearOptions}
            /> */}
            <Dropdown
              value={mapSettings.nocSettings.value}
              setValue={mapSettings.nocSettings.setValue}
              options={NocOptions}
              size="lg"
            />
            <div className="">
              <RangeSlider
                defaultValue={[2006, 2021]}
                min={2006}
                max={2021}
                step={1}
                width={300}
                onChange={onYearChange}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
                <RangeSliderMark
                  value={Number(mapSettings.yearSettingsStart.value)}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {mapSettings.yearSettingsStart.value}
                </RangeSliderMark>
                <RangeSliderMark
                  value={Number(mapSettings.yearSettingsEnd.value)}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {mapSettings.yearSettingsEnd.value}
                </RangeSliderMark>
              </RangeSlider>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-2">
              <Dropdown
                value={chart1Settings.provinceSettings.value}
                setValue={chart1Settings.provinceSettings.setValue}
                options={ProvinceOptions}
                size="md"
              />
              {/* <Dropdown
                value={chart1Settings.nocSettings.value}
                setValue={chart1Settings.nocSettings.setValue}
                options={NocOptions}
                size="lg"
              /> */}
            </div>
            <div className="flex flex-row space-x-2">
              <Dropdown
                value={chart2Settings.provinceSettings.value}
                setValue={chart2Settings.provinceSettings.setValue}
                options={ProvinceOptions}
                size="md"
              />
              {/* <Dropdown
                value={chart2Settings.nocSettings.value}
                setValue={chart2Settings.nocSettings.setValue}
                options={NocOptions}
                size="lg"
              /> */}
            </div>
          </div>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex flex-row justify-start -mt-48">
            <CanadaMap
              fillColor="#50aaeb"
              onHoverColor="#a1d7ff"
              height={700}
              width={753}
              onClick={(province: string) => {
                console.log(province);
              }}
              startYear={mapSettings.yearSettingsStart.value.toString()}
              endYear={mapSettings.yearSettingsEnd.value.toString()}
              occupation={mapSettings.nocSettings.value}
            />
          </div>
          <div className="flex flex-col">
            <Chart />
            <Chart />
          </div>
        </section>
      </div>
    </div>
  );
}
