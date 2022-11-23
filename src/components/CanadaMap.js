import Canada from "../components/CanadaMap/Canada";
import data from "../components/CanadaMap/data/jobdata.json";
import { useMemo } from "react";
import { NocOptions, ProvinceOptions, YearOptions, ProvinceAbbOptions } from "../lib/Options";

const colorscale = [
  "red",
  "blue",
  "green",
  "green",
  "green",
  "green",
];

const CanadaMap = (props) => {
  const { fillColor, onHoverColor, height, width, onClick, startYear, endYear, occupation } = props;

  const calculateData = useMemo(()=>{
    let colors = {}
    ProvinceOptions.forEach((province)=>{
        const provinceData = data[province];
        let startValue = 0;
        let endValue = 0;

        provinceData?.forEach((record)=>{
            if(record.occupation === occupation && record.year === startYear){
                startValue = record.value;
            }
            if(record.occupation === occupation && record.year === endYear){
                endValue = record.value;
            }
        })
        const valueChange = (endValue - startValue) / startValue;
        let color = ""
        if(valueChange < 0){
            color = colorscale[0]
        }
        if(valueChange > 0){
            color = colorscale[1]
        }
        if(valueChange > 0.2){
            color = colorscale[2]
        }
        if(valueChange > 0.4){
            color = colorscale[3]
        }
        if(valueChange > 0.6){
            color = colorscale[4]
        }
        if(valueChange > 0.8){
            color = colorscale[5]
        }
        colors[province] = color;

    })
    return {
        BC: { fillColor: colors['British Columbia'] },
        AB: { fillColor: colors['Alberta'] },
        SK: { fillColor: colors['Saskatchewan'] },
        MB: { fillColor: colors['Manitoba'] },
        ON: { fillColor: colors['Ontario'] },
        QC: { fillColor: colors['Quebec'] },
        NB: { fillColor: colors['New Brunswick'] },
        NS: { fillColor: colors['Nova Scotia'] },
        PE: { fillColor: colors['Prince Edward Island'] },
        NL: { fillColor: colors['Newfoundland and Labrador'] },
        YT: { fillColor: colors['Yukon'] },
        NT: { fillColor: colors['Northwest Territories'] },
        NU: { fillColor: colors['Nunavut'] },
      };

  },[endYear, occupation, startYear])

  const mapClickHandler = (province, event) => {
    console.log("province clicked: ", province)
  }

  return (
    <Canada
      fillColor={fillColor}
      onHoverColor={onHoverColor}
      height={height}
      width={width}
      customize={calculateData}
      onClick={mapClickHandler}
    />
  );
};

export default CanadaMap;
