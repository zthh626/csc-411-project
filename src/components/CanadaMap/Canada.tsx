import React, { Component, MouseEvent } from "react";
import data from "./data/data";
import Province from "./Province";
import drawDetails from "./svgUtils";

interface Props {
  onClick: (province: Provinces, event: MouseEvent) => void;
  width: number;
  height: number;
  fillColor: string;
  onHoverColor: string;
  customize: { [key in Provinces]?: ProvinceCustomizations };
}

export enum Provinces {
  BC = "BC",
  AB = "AB",
  SK = "SK",
  MB = "MB",
  ON = "ON",
  QC = "QC",
  NB = "NB",
  NS = "NS",
  PE = "PE",
  NL = "NL",
  YT = "YT",
  NT = "NT",
  NU = "NU",
}

type ProvinceType =
  | "BC"
  | "AB"
  | "SK"
  | "MB"
  | "ON"
  | "QC"
  | "NB"
  | "NS"
  | "PE"
  | "NL"
  | "YT"
  | "NT"
  | "NU";

export interface ProvinceCustomizations {
  fillColor?: string;
  onHoverColor?: string;
}

class Canada extends Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    width: 1113,
    height: 942,
    fillColor: "#D3D3D3",
    onHoverColor: "#ffffff",
    customize: {},
  };

  fillProvinceColor = (province: ProvinceType | undefined): string => {
    if (province && this.props?.customize[province]?.fillColor !== undefined) {
      return this.props.customize[province]?.fillColor ?? "";
    }

    return this.props.fillColor;
  };

  fillProvinceHoverColor = (province: ProvinceType): string => {
    if (
      province &&
      this.props?.customize[province]?.onHoverColor !== undefined
    ) {
      return this.props.customize[province]?.onHoverColor ?? "";
    }

    return this.props.onHoverColor;
  };

  buildProvinces = () => {
    const paths = [];
    const prov_data = (data as any)["default"];
    for (const province in prov_data) {
      const path = (
        <Province
          key={province}
          dimensions={prov_data[province]["dimensions"]}
          provinceAbbreviation={province}
          provinceName={prov_data[province]["name"]}
          fillColor={this.fillProvinceColor(province as ProvinceType)}
          onHoverColor={this.fillProvinceHoverColor(province as ProvinceType)}
          onClick={(e: MouseEvent) =>
            this.props.onClick(Provinces[province as ProvinceType], e)
          }
        />
      );
      paths.push(path);
    }
    return paths;
  };

  render() {
    return (
      <svg
        className="canada-map"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="-24500 -15050 55700 32000"
      >
        {drawDetails()}
        {this.buildProvinces()}
      </svg>
    );
  }
}

export default Canada;
