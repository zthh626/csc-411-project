import Chart from "../components/Chart";
import { Dropdown } from "../components/Dropdown";
import { NocOptions, ProvinceOptions, YearOptions, ProvinceAbbOptions } from "../lib/Options";
import { useSettingsContext } from "../lib/SettingsContext";
import CanadaMap from "../components/CanadaMap"


export default function Map() {
  const { mapSettings, chart1Settings, chart2Settings } = useSettingsContext();

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
            <Dropdown
              value={mapSettings.yearSettings.value}
              setValue={mapSettings.yearSettings.setValue}
              options={YearOptions}
            />
            <Dropdown
              value={mapSettings.nocSettings.value}
              setValue={mapSettings.nocSettings.setValue}
              options={NocOptions}
              size="lg"
            />
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
              height={890}
              width={753}
              onClick={(province: string) => {
                console.log(province);
              }}
              startYear="2006"
              endYear="2015"
              occupation="Management occupations [0]"
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
