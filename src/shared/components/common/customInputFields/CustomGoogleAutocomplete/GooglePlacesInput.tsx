/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable complexity */
import * as React from "react";
import { useEffect, useRef } from "react";
import { loadGoogleMapsScript } from "./GoogleMapsLoader";
import "../mainStyles.css";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

declare global {
  interface Window {
    google: any;
  }
}
interface IGoogleAutoComplete
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  isValid?: boolean;
  errorMsg?: string;
  Label?: string;
  customReadOnly?: boolean;
  labelLoading?: boolean;
  width?: string | number;
  isRequired?: boolean;
}

const GooglePlacesInput: React.FC<IGoogleAutoComplete> = ({
  placeholder,
  value,
  onChange,
  isValid = true,
  errorMsg = "",
  Label = "",
  customReadOnly = false,
  labelLoading,
  width,
  isRequired = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      await loadGoogleMapsScript();

      if (!window.google || !inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
        }
      );

      autocomplete.setFields([
        "address_component",
        "formatted_address",
        "geometry",
      ]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        let region = "";
        let state = "";
        let city = "";
        let postalCode = "";
        let country = "";
        let latitude = null;
        let longitude = null;

        if (place.geometry?.location) {
          latitude = place.geometry.location.lat();
          longitude = place.geometry.location.lng();
        }

        if (place.address_components) {
          for (const component of place.address_components) {
            const types = component.types;

            if (types.includes("locality")) city = component.long_name;
            else if (types.includes("sublocality") && !city)
              city = component.long_name;

            if (types.includes("administrative_area_level_1")) {
              state = component.short_name;
              region = component.long_name;
            }

            if (types.includes("postal_code")) postalCode = component.long_name;

            if (types.includes("country")) country = component.long_name;
          }
        }

        const selectedAddress: any = {
          Place:
            place?.formatted_address ??
            place?.address_components?.map((c: any) => c.long_name).join(", "),
          // Place: place?.address_components
          //   ?.map((c: any) => c.long_name)
          //   .join(", "),
          State: state,
          Region: region,
          City: city,
          PostalCode: postalCode,
          Country: country,
          Latitude: latitude,
          Longitude: longitude,
        };

        onChange?.(selectedAddress);
      });
    };

    if (inputRef.current) {
      initAutocomplete();
    }
  }, [inputRef.current]);

  return (
    <div className="custom-input-wrapper" style={{ width: width ?? "100%" }}>
      {Label?.trim() && (
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      {customReadOnly ? (
        <div className="readOnlyValue">
          <CustomTooltip
            text={value || "-"}
            width={"200px"}
            placement="left"
            loading={labelLoading}
          />
        </div>
      ) : (
        <input
          {...rest}
          type="text"
          placeholder={placeholder}
          autoFocus={rest.autoFocus ?? false}
          className={`custom-input ${!isValid ? "input-error" : ""}`}
          ref={inputRef}
          value={value}
          style={{
            padding: "4px 10px",
          }}
          onChange={onChange}
        />
      )}

      {!isValid && errorMsg && (
        <span className="error-message">{errorMsg}</span>
      )}
    </div>
  );
};

export default GooglePlacesInput;
