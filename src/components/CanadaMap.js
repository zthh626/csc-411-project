import Canada from "../components/CanadaMap/Canada";
import data from "../components/CanadaMap/data/jobdata.json";
import { useMemo } from "react";
import {
  NocOptions,
  ProvinceOptions,
  YearOptions,
  ProvinceAbbOptions,
} from "../lib/Options";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

const colorscale = ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"];

const CanadaMap = (props) => {
  const {
    fillColor,
    onHoverColor,
    height,
    width,
    onClick,
    startYear,
    endYear,
    occupation,
  } = props;

  const calculateData = useMemo(() => {
    let colors = {};
    ProvinceOptions.forEach((province) => {
      const provinceData = data[province];
      let startValue = 0;
      let endValue = 0;

      provinceData?.forEach((record) => {
        if (record.occupation === occupation && record.year === startYear) {
          startValue = record.value;
        }
        if (record.occupation === occupation && record.year === endYear) {
          endValue = record.value;
        }
      });
      const valueChange = (endValue - startValue) / startValue;
      let color = "";
      if (valueChange < -0.2) {
        color = colorscale[0];
      } else if (valueChange < -0.1) {
        color = colorscale[1];
      } else if (valueChange > -0.1 && valueChange < 0.1) {
        color = colorscale[2];
      } else if (valueChange > 0.1) {
        color = colorscale[3];
      } else if (valueChange > 0.2) {
        color = colorscale[4];
      } else {
        color = "#BEBEBE";
      }
      colors[province] = color;
    });
    return {
      BC: { fillColor: colors["British Columbia"] },
      AB: { fillColor: colors["Alberta"] },
      SK: { fillColor: colors["Saskatchewan"] },
      MB: { fillColor: colors["Manitoba"] },
      ON: { fillColor: colors["Ontario"] },
      QC: { fillColor: colors["Quebec"] },
      NB: { fillColor: colors["New Brunswick"] },
      NS: { fillColor: colors["Nova Scotia"] },
      PE: { fillColor: colors["Prince Edward Island"] },
      NL: { fillColor: colors["Newfoundland and Labrador"] },
      YT: { fillColor: colors["Yukon"] },
      NT: { fillColor: colors["Northwest Territories"] },
      NU: { fillColor: colors["Nunavut"] },
    };
  }, [endYear, occupation, startYear]);

  const mapClickHandler = (province, event) => {
    console.log("province clicked: ", province);
  };

  return (
    <div>
      <Canada
        fillColor={fillColor}
        onHoverColor={onHoverColor}
        height={height}
        width={width}
        customize={calculateData}
        onClick={mapClickHandler}
      />
      <div>
        <Tag bg={colorscale[0]}>{"-20%"}</Tag>
        <Tag bg={colorscale[1]}>{"-10%"}</Tag>
        <Tag bg={colorscale[2]}>{"0%"}</Tag>
        <Tag bg={colorscale[3]}>{"10%"}</Tag>
        <Tag bg={colorscale[4]}>{"20%"}</Tag>
      </div>
    </div>
  );
};

export default CanadaMap;
