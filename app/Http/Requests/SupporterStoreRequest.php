<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class SupporterStoreRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */

  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */

  public function rules()
  {
    return [
      'organisation' => 'required',
      'website' => 'required',
      'image' => 'mimes:jpeg,png,jpg,eps,tiff,svg|max:16384',
      'email' => 'required|email',
    ];
  }

  /**
   * Custom message for validation
   *
   * @return array
   */

  public function messages()
  {
    return [
      'organisation.required' => 'Organisation fehlt',
      'website.required' => 'Webseite fehlt',
      'email.required' => 'E-Mail fehlt',
      'email.email' => 'E-Mail ungültig',
      'image.mimes' => 'Logoformat ungültig (erlaubt sind JPG, PNG, EPS, TIFF, SVG)',
      'image.max' => 'Logo zu gross (max. 16MB)',
    ];
  }
}