import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Popup from "../components/Popup/Popup";

describe("Rendering", () => {
    it('should update state in Popup when input fields are changed and generate correct JSON object', () => {
        render(<Popup onCancel={() => { }} userId="1" />);

        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
            status: 201,
            json: jest.fn().mockResolvedValue({}),
        });

        fireEvent.change(screen.getByLabelText(/Type:/i), { target: { value: 'CustomType' } });
        fireEvent.change(screen.getByLabelText(/Humidity level:/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Moisture level:/i), { target: { value: '60' } });
        fireEvent.change(screen.getByLabelText(/Temperature level:/i), { target: { value: '25' } });
        fireEvent.change(screen.getByLabelText(/Light level:/i), { target: { value: '500' } });

        fireEvent.click(screen.getByTestId("save-button"));

        const expectedPresetData = {
            userId: '1',
            name: 'CustomType',
            humidity: '50',
            moisture: '60',
            temperature: '25',
            uvLight: '500',
        };
        
        expect(window.fetch).toHaveBeenCalledWith(
            'http://127.0.0.1/5000/PlantPreset/createPlantPreset',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(expectedPresetData),
            })
        );
    });

    it('should trigger actions when buttons in Popup are clicked', () => {
        const onCancelMock = jest.fn();
        render(<Popup onCancel={onCancelMock} userId="1" />);

        // Simulate clicking on the "Cancel" button
        fireEvent.click(screen.getByText(/Cancel/i));

        // Assert that the onCancel function is called
        expect(onCancelMock).toHaveBeenCalledTimes(1);

    });
})