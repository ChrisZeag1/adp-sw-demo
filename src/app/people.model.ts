export interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  count: number;
};

export interface IPeopleApiResponse {
  results: Array<IPeople>;
  hasError?: boolean;
}
