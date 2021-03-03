import { renderHook } from "@testing-library/react-hooks";
import { useTheFetch } from "./use-the-fetch";
import { getStarWarsDetails } from "./base-fetch";
jest.mock("./base-fetch");

describe("use the fetch", () => {
  it("initial data state is loading and data empty", () => {
    const { result } = renderHook(() => useTheFetch("people"));

    expect(result.current).toStrictEqual({ loading: true, data: null });
  });

  it("data is fetched and not loading", async () => {
    const fakeSWData = { result: [{ name: "Luke Skywalker" }] };
    getStarWarsDetails.mockResolvedValue(fakeSWData);
    const { result, waitForNextUpdate } = renderHook(() =>
      useTheFetch("people")
    );

    await waitForNextUpdate();

    expect(getStarWarsDetails).toBeCalledWith("people");
    expect(result.current).toStrictEqual({
      loading: false,
      data: fakeSWData
    });
  });
});
